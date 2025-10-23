import { HttpInterceptorFn } from '@angular/common/http';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  // Récupérer le token du localStorage ou sessionStorage
  const token = localStorage.getItem('token'); // ou sessionStorage
  
  if (token) {
    // Cloner la requête et ajouter le header Authorization
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Token ${token}` // ou `Bearer ${token}` selon votre backend
      }
    });
    return next(clonedRequest);
  }
  
  return next(req);
};