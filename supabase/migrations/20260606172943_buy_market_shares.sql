-- Atomic fake-money buy: deduct balance, upsert position, write ledger entry.

create or replace function public.buy_market_shares(
  p_market_id uuid,
  p_side text,
  p_amount_cents bigint
)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_balance_cents bigint;
  v_market_status text;
  v_close_date timestamptz;
  v_yes_shares_cents bigint;
  v_no_shares_cents bigint;
begin
  if v_user_id is null then
    raise exception 'not_authenticated';
  end if;

  if p_side not in ('yes', 'no') then
    raise exception 'invalid_side';
  end if;

  if p_amount_cents is null or p_amount_cents <= 0 then
    raise exception 'invalid_amount';
  end if;

  select status, close_date
  into v_market_status, v_close_date
  from public.markets
  where id = p_market_id;

  if not found then
    raise exception 'market_not_found';
  end if;

  if v_market_status <> 'open' or v_close_date <= now() then
    raise exception 'market_not_buyable';
  end if;

  select balance_cents
  into v_balance_cents
  from public.profiles
  where id = v_user_id
  for update;

  if not found then
    raise exception 'profile_not_found';
  end if;

  if v_balance_cents < p_amount_cents then
    raise exception 'insufficient_balance';
  end if;

  update public.profiles
  set balance_cents = balance_cents - p_amount_cents
  where id = v_user_id;

  insert into public.positions (
    user_id,
    market_id,
    yes_shares_cents,
    no_shares_cents
  )
  values (
    v_user_id,
    p_market_id,
    case when p_side = 'yes' then p_amount_cents else 0 end,
    case when p_side = 'no' then p_amount_cents else 0 end
  )
  on conflict (user_id, market_id) do update
  set
    yes_shares_cents = public.positions.yes_shares_cents + excluded.yes_shares_cents,
    no_shares_cents = public.positions.no_shares_cents + excluded.no_shares_cents;

  select yes_shares_cents, no_shares_cents
  into v_yes_shares_cents, v_no_shares_cents
  from public.positions
  where user_id = v_user_id
    and market_id = p_market_id;

  insert into public.ledger_entries (
    user_id,
    market_id,
    amount_cents,
    entry_type,
    description
  )
  values (
    v_user_id,
    p_market_id,
    -p_amount_cents,
    case when p_side = 'yes' then 'buy_yes' else 'buy_no' end,
    'Fake-money buy'
  );

  return jsonb_build_object(
    'balance_cents', v_balance_cents - p_amount_cents,
    'yes_shares_cents', v_yes_shares_cents,
    'no_shares_cents', v_no_shares_cents
  );
end;
$$;

revoke all on function public.buy_market_shares(uuid, text, bigint) from public;
grant execute on function public.buy_market_shares(uuid, text, bigint) to authenticated;
