import { useAuthStore } from '../authStore';

describe('AuthStore (Lotae)', () => {
  beforeEach(() => {
    useAuthStore.getState().reset();
  });

  it('deve inicializar desautenticado', () => {
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.session).toBeNull();
    expect(state.profile).toBeNull();
  });

  it('deve atualizar o estado ao definir sessão manualmente', () => {
    const mockSession = {
      access_token: 'fake-jwt',
      token_type: 'bearer',
      user: {
        id: 'user-123',
        email: 'teste@lotae.com',
      },
    } as any;

    useAuthStore.getState().setSession(mockSession);

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.session).toEqual(mockSession);
  });

  it('deve limpar o estado ao fazer reset ou signOut', () => {
    useAuthStore.getState().setSession({ access_token: 'token' } as any);
    useAuthStore.getState().reset();

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.session).toBeNull();
  });
});
