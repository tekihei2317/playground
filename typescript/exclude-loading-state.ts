type User = { name: string };
type LoadingState = { loading: true };
type LoadedState<T> = { loading: false; user: T | undefined };
type LoadableState<T> = LoadingState | LoadedState<T>;
type UserState = LoadableState<User>;

const userState: UserState = [
  { loading: true } as const,
  {
    loading: false,
    user: undefined,
  },
][0];

type UseAuthOptions = {
  assertLoaded: boolean;
};

// カスタムフックを想定
const useAuth = () => {
  return userState;
};

// ローディングの状態を排除する
const useLoadedAuth = () => {
  const state = useAuth();

  if (state.loading) {
    throw new Error("State is not loaded");
  }
  return state;
};

type TargetFn<T> = () => LoadableState<T>;

// 汎用的に使う用
function pullLoadedStateOrThrow<T>(fn: TargetFn<T>) {
  const state = fn();

  if (state.loading) {
    throw new Error("State is not loaded");
  }
  return state;
}

const state1 = useAuth(); // UserState
const state2 = useLoadedAuth(); // LoadedState<User>
const state3 = pullLoadedStateOrThrow(useAuth); // LoadedState<User>
