import { ProtectedUserResponseDto } from './../dtos/protected-user-response.dto';
import { SignInResponseDto } from './../../../public-module/shared-public-module/dtos/sign-in-response.dto';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable} from "rxjs";
import { BackEndPoints } from "../../../shared-module/enums/back-end-points.enum";
import { PublicUserResponseDto } from "../../../shared-module/dtos/public-user-response.dto";
import { RefreshTokenRequestDto } from "../dtos/refresh-token-request.dto";
import { Role } from "../../../shared-module/enums/role.enum";
import { TokenService } from "../../../core-module/services/token.service";
import { HttpStatusCode } from "axios";
import { GetUserRequestDto } from '../../../public-module/shared-public-module/dtos/get-user-request.dto';

@Injectable()
export class ProtectedUserService {
  
  // HTTP
  // ==============================================
  /* Headers variables */

  // DEPENDENCIES INJECTIONS BY CONSTRUCTOR
  // ==============================================
  constructor(private http: HttpClient, private tokenService: TokenService) {}

  // SERVICE METHODS
  // ==============================================

  // getCurrentUser(
  //   bearer: string
  // ): Observable<HttpResponse<PublicUserResponseDto>> {
  //   const headers = new HttpHeaders({
  //     "Content-Type": "plain/text",
  //     Authorization: `Bearer ${bearer}`,
  //   });

  //   return this.http
  //     .get<NewPublicUserResponseDto>(BackEndPoints.GET_CURRENT_USER, {
  //       headers,
  //     }) // Envoi de la requete HTTP et réception d'un observable
  //     .pipe(
  //       //Applique des transformations sur les données directement dans le template
  //       tap(
  //         //Effectue des actions sur les valeurs émises par l'observable, sans les modifier
  //         (response) => this.log(response)
  //       ),
  //       // Si erreur, on logue l'erreur et on retourne un tableau vide pour éviter de faire planter l'application
  //       catchError((error) => this.handleError(error, []))
  //     );
  // }

  /**
   * Retrieves the currently logged-in user from the supplied token
   *
   * @param {string} bearer
   * @returns {Observable<HttpResponse<PublicUserResponseDto>>}
   *
   * @author atsuhikoMochizuki
   * @since 2024-05-27
   */
  getCurrentUser(
    bearer: string
  ): Observable<HttpResponse<PublicUserResponseDto>> {
    // Headers definitions
    const headers = new HttpHeaders({
      "Content-Type": "plain/text",
      Authorization: `bearer ${bearer}`,
    });

    return this.http.get<PublicUserResponseDto>(
      // Url
      BackEndPoints.GET_CURRENT_USER,

      // Options
      {
        headers: headers,
        observe: "response",
      }
    );
  }

  /**
   * Signout current user identified by bearer
   *
   * @param {string} bearer
   * @returns {Observable<HttpResponse<string>>}
   *
   * @author atsuhikoMochizuki
   * @since 2024-05-27
   */
  signOut(bearer: string): Observable<HttpResponse<string>> {
    const headers = {
      "content-type": "application/json",
      Authorization: "bearer " + bearer,
    };

    return this.http.post(
      // Url
      BackEndPoints.SIGN_OUT,
      null,
      // Options
      {
        // Uncomment if body response is plain/text
        responseType: "text",

        // headers injection
        headers: headers,

        // Get full Http response
        observe: "response",
      }
    );
  }

  sendRefreshToken(
    refreshTokenRequestDto: RefreshTokenRequestDto
  ): Observable<HttpResponse<SignInResponseDto>> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });

    return this.http.post<SignInResponseDto>(
      BackEndPoints.REFRESH_TOKEN,
      JSON.stringify(refreshTokenRequestDto),
      {
        headers: headers,
        reportProgress: true,
        observe: "response",
      }
    );
  }

  getAllUsers(bearer:string)
    : Observable<HttpResponse<ProtectedUserResponseDto[]>> {
      const headers = {
        "content-type": "application/json",
        Authorization: "bearer " + bearer,
      };
  
      return this.http.get<ProtectedUserResponseDto[]>(
        // Url
        BackEndPoints.GET_ALL_USERS,
        // Options
        {
          headers: headers,
          observe: "response",
        }
      );
  }

  // getUserList(): Observable<User[]> {
  //   return this.http.get<User[]>('api/users') // Envoi de la requete HTTP et réception d'un observable
  //     .pipe(  //Applique des transformations sur les données directement dans le template
  //       tap(  //Effectue des actions sur les valeurs émises par l'observable, sans les modifier
  //         response => this.log(response)),
  //       // Si erreur, on logue l'erreur et on retourne un tableau vide pour éviter de faire planter l'application
  //       catchError(error => this.handleError(error, []))
  //     );
  // }

  // getUserById(userId: number): Observable<User | undefined> {
  //   const headers = new HttpHeaders({
  //     "Content-Type": "application/json",
  //     Authorization: `bearer ${bearer}`,
  //   });
  //   return this.http.get<User>(`api/users/${userId}`)
  //     .pipe(
  //       tap(response => this.log(response)),
  //       catchError(error => this.handleError(error, undefined))
  //     );
  // }

  // gettUserById(userId:number,bearer: string):Observable<HttpResponse<PublicUserResponseDto>>{
  //   const headers = new HttpHeaders({
  //     "Content-Type": "application/json",
  //     Authorization: `bearer ${bearer}`,
  //   });
  //   return this.http.get<PublicUserResponseDto>(
  //     `${BackEndPoints.USER}/${userId}`),
  //   // Options
  //   {
  //     headers: headers,
  //     observe: "response",
  //   }

  // }

  getUserByUsername(
      username: string,
      bearer: string)
      : Observable<HttpResponse<PublicUserResponseDto>> {
   
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `bearer ${bearer}`,
    });

    const getUserRequestDto: GetUserRequestDto = {
      "username":username
    };

    return this.http.post<PublicUserResponseDto>(
      `${BackEndPoints.GET_USER}`, 
      getUserRequestDto,
      {
      headers: headers,
      observe: "response",
    });
  }

  // getUserById(userId:number,
  //   bearer: string
  // ): Observable<HttpResponse<PublicUserResponseDto>> {
  //   // Headers definitions
  //   const headers = new HttpHeaders({
  //     "Content-Type": "application/json",
  //     Authorization: `bearer ${bearer}`,
  //   });

  //   return this.http.get<PublicUserResponseDto>(
  //     // Url
  //     `BackEndPoints.USER/${userId}`,

  //     // Options
  //     {
  //       headers: headers,
  //       observe: "response",
  //     }
  //   );
  // }

  // updateUser(user: User): Observable<null> {
  //   //Déclaration du header pour pouvoir y insérer les données
  //   const httpOptions = {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  //   };
  //   return this.http.put('api/users/', user, httpOptions).pipe(
  //     tap(response => this.log(response)),
  //     catchError(error => this.handleError(error, null))
  //   );
  // }

  // addUser(user: User): Observable<User> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  //   };

  //   return this.http.post<User>('api/users', user, httpOptions)
  //     .pipe(
  //       tap(response => this.log(response)),
  //       catchError(error => this.handleError(error, null))
  //     );
  // }

  // deleteUserById(userId: number): Observable<null> {
  //   return this.http.delete(`api/users/${userId}`)
  //     .pipe(
  //       tap(response => this.log(response)),
  //       catchError(error => this.handleError(error, null))
  //     );
  // }

  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // private log(response: any) {
  //   console.table(response);
  // }

  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // private handleError(error: Error, errorValue: any) {
  //   console.error(error);
  //   return of(errorValue)
  // }

  // /* Pour des raisons de sécurité, il ne semble pas possible de pouvoir
  // charger directement une image avec le chemin dans la machine hôte
  // appartenant à l'utilisateur.
  // Cette méthode récupère le contenu du fichier, pour ensuite pouvoir le manipuler*/
  // loadUserAvatar(user: User) {
  //   if (!user.picture) {
  //     const imgElement = new Image();

  //     if (user.avatar) {
  //       imgElement.src = user.avatar;
  //       imgElement.alt = 'User profile image';
  //       user.picture = imgElement.src;
  //     } else {
  //       imgElement.src = '../assets/user.png';
  //       imgElement.alt = 'User profile image';
  //       user.picture = imgElement.src;
  //     }
  //   }
  // }

  /**
   * Check if user is admin
   *
   * @param bearer the Jwt
   *
   * @returns an Observable containing true if current connected user is admin else false
   *
   * @author atsuhikoMochizuki
   * @since 2024-06-10
   */
  isAdmin(bearer: string): Observable<boolean> {
    const isAdminObservable: Observable<boolean> = new Observable(
      (observer) => {
        const token: string | null = this.tokenService.getToken();

        if (token) {
          this.getCurrentUser(bearer).subscribe((response) => {
            if (
              response.body !== null &&
              response.status == HttpStatusCode.Ok
            ) {
              const user: PublicUserResponseDto = response.body;

              if (user.role === Role.ADMIN) {
                observer.next(true);
              } else {
                observer.next(false);
              }
            } else {
              observer.next(false);
            }
          });
        } else {
          observer.next(false);
        }
      }
    );

    return isAdminObservable;
  }
}
