-- inserts a row into public.profile
DO $$ BEGIN
  create function public.handle_new_user()
  returns trigger
  language plpgsql
  security definer set search_path = public
  as $insert$
  begin
    insert into public.profile (id, email)
    values (
      new.id,
      new.email
    )
    on conflict (id) do update set
      email = excluded.email;
    return new;
  end;
  $insert$;
EXCEPTION
  when duplicate_function then
  null;
END $$;

-- trigger the function every time a user is created
DO $$ BEGIN
  create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();
EXCEPTION
  when duplicate_object then
  null;
END $$;

-- trigger the function when a user signs in/their email is confirmed to get missing values if any
DO $$ BEGIN
  create trigger on_auth_user_verified
    after update on auth.users
    for each row when (
      old.last_sign_in_at is null
      and new.last_sign_in_at is not null
    ) execute procedure public.handle_new_user();
EXCEPTION
  when duplicate_object then
  null;
END $$;
