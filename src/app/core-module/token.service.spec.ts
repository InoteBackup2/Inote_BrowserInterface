import { TokenService } from "./token.service";


describe('TokenService', ()=>{
    let tokenService: TokenService;
    let token: string;
    let isStored: boolean;
    let gottenToken: string | null;

    beforeEach(()=>{
        tokenService = new TokenService();
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
        tokenService.saveToken(token);
    });

    it('adds token into local storage', ()=>{

        isStored = tokenService.isLogged();
        gottenToken = tokenService.getToken();

        expect(isStored).toBe(true);
        expect(gottenToken).toEqual(token);
    });

    it('deletes token into local storage', ()=>{
        tokenService.removeToken();
        isStored = tokenService.isLogged();
        gottenToken = tokenService.getToken();

        expect(isStored).toBe(false);
        expect(gottenToken).toEqual(null);
    });
});