import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { environment } from 'src/environments/environment';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
// const  token :any= localStorage.getItem("token");
// const this.user_id:any = localStorage.getItem('user_id');
@Injectable({
    providedIn: 'root'
})

// export class ApiService implements OnInit {
    export class ApiService {
    expressApiUrl = "https://ss2.equationswork.us:3001";
       user_id:any;
       token:any;

   //token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjYsImlhdCI6MTY0NjYzNjQ3OSwiZXhwIjoxNjQ2NjY1Mjc5fQ.CL7jltwoZXf0xjO8WIQBgLBjuFY67-jAx-UHzCFi7hM";
  
    // httpOptionss = {
    //     body: '[{"key": "", "operation": "", "value": ""}]',
    //     headers: new HttpHeaders({
    //         'Content-Type': 'application/json',
    //         'x-access-token': '',
    //        // 'token': `${this.token}`
    //     })
    // };
    httpOptions = {
     
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'x-access-token': '',
           // 'token': `${this.token}`
        })
    };
   // user_id=26;
    //token:any;
   // token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjYsImlhdCI6MTY0NjMyMjkxNywiZXhwIjoxNjQ2MzUxNzE3fQ.fkuZbyv91-WBJUwRBIhdoXkOuCFxI0aXuuYrrqoE4Hc"
    invokeFirstComponentFunction = new EventEmitter();
    constructor(private http: HttpClient) { 
    
    }

  
    // ngOnInit(): void {
    
    //     this.httpOptions = {
    //         headers: new HttpHeaders({
    //             'Content-Type': 'application/json',
    //             'x-access-token': '',
    //             'token': `${this.token}`
    //         })
    //     };
    // }
    getUserIDToken(){
    this.user_id=localStorage.getItem("userID");
    this.token=localStorage.getItem("userToken");
console.log(this.user_id);console.log(this.token);
    }
    handleError(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = error.error.message;
        } else {
            errorMessage = error.error.message;
        }
        return throwError(errorMessage);
    }
    generateAccessCode(formData: any): Observable<any> {
     
        return this.http.put(this.expressApiUrl + '/User/GenerateAccessCode', formData, this.httpOptions = {
            headers: new HttpHeaders({
                  'token': `${this.token}`
            })
        }).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    adminLogin(formData: any): Observable<any> {
        
        return this.http.post(this.expressApiUrl + '/User/AdminLogin', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    importDealerCSV(formData: any): Observable<any> {
        this.getUserIDToken();
        return this.http.post(this.expressApiUrl + '/Dealers/ImportDealers/'+this.user_id, formData, this.httpOptions = {
            headers: new HttpHeaders({
               
                'token': `${this.token}`
            })
        }).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    downloadTemplateCSV(): Observable<any> {
        this.getUserIDToken();
        return this.http.get(this.expressApiUrl + '/Dealers/CSVTemplate/'+this.user_id, this.httpOptions = {
            headers: new HttpHeaders({
                  'token': `${this.token}`
            })
        }).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getDashboardAnalytics(): Observable<any> {
        this.getUserIDToken();
             console.log("in service file")
             return this.http.get(this.expressApiUrl + '/dashboardCards/getDashboardAnalytics/'+this.user_id, this.httpOptions = {
                 headers: new HttpHeaders({
                       'token': `${this.token}`
                 })
             }).pipe(
                 respdata => respdata,
                 catchError(this.handleError)
             );
         }
    getDealersList(): Observable<any> {
   this.getUserIDToken();
        console.log("in service file")
        return this.http.get(this.expressApiUrl + '/Dealers/DealersList/'+this.user_id, this.httpOptions = {
            headers: new HttpHeaders({
                  'token': `${this.token}`
            })
        }).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    deleteDealer(dealer_id:any): Observable<any> {
        this.getUserIDToken();
        return this.http.delete(this.expressApiUrl + '/Dealers/DeleteDealer/'+this.user_id+'/'+dealer_id, this.httpOptions = {
            headers: new HttpHeaders({
                  'token': `${this.token}`
            })
        }).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }

    updateDealerStatus(formData: any): Observable<any> {
        this.getUserIDToken();
        return this.http.put(this.expressApiUrl + '/Dealers/UpdateDealerStatus/'+this.user_id, formData, this.httpOptions = {
            headers: new HttpHeaders({
                  'token': `${this.token}`
            })
        }).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getCountries(): Observable<any> {
        
        return this.http.get(this.expressApiUrl + '/User/GetCountry', this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getStateByCountryId(country_id: any): Observable<any> {
        return this.http.get(this.expressApiUrl + '/User/GetState/'+country_id,this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getCityByStateId(state_id: any): Observable<any> {
        return this.http.get(this.expressApiUrl + '/User/GetCities/'+state_id,this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    searchFilterDealer(formData: any): Observable<any> {
        this.getUserIDToken();
        return this.http.post(this.expressApiUrl + '/Dealers/SearchDealers/'+this.user_id, formData,this.httpOptions = {
            headers: new HttpHeaders({
                  'token': `${this.token}`
            })
        }).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getCustomerList(): Observable<any> {
        this.getUserIDToken();
        return this.http.get(this.expressApiUrl + '/Customer/GetCustomerList/'+this.user_id
        , this.httpOptions = {
            headers: new HttpHeaders({
                  'token': `${this.token}`
            })
        }).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    deleteCustomer(customer_id: any): Observable<any> {
        
        this.getUserIDToken();
        return this.http.delete(this.expressApiUrl + '/Customer/DeleteCustomer/'+this.user_id+'/'+customer_id, this.httpOptions = {
            headers: new HttpHeaders({
                  'token': `${this.token}`
            })
        }).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }

    searchFilterCustomer(formData: any): Observable<any> {
        this.getUserIDToken();
        return this.http.post(this.expressApiUrl + '/Customer/SearchCustomer/'+this.user_id, formData, this.httpOptions = {
            headers: new HttpHeaders({
                  'token': `${this.token}`
            })
        }).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    viewCustomerDetailsById(customer_id: any): Observable<any> {
        this.getUserIDToken();
        return this.http.get(this.expressApiUrl + '/Customer/ViewCustomerDetailsByID/'+this.user_id+'/'+customer_id, this.httpOptions = {
            headers: new HttpHeaders({
                  'token': `${this.token}`
            })
        }).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getComplaints(): Observable<any> {
        this.getUserIDToken();
        return this.http.get(this.expressApiUrl + '/NGP/GetAllNGPFeedback/'+this.user_id,this.httpOptions = {
            headers: new HttpHeaders({
                  'token': `${this.token}`
            })
        }).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    deleteComplaint(complaint_id: any): Observable<any> {
        this.getUserIDToken();
        return this.http.delete(this.expressApiUrl + '/NGP/DeleteNGPComplaint/'+this.user_id+'/'+complaint_id, this.httpOptions = {
            headers: new HttpHeaders({
                  'token': `${this.token}`
            })
        }).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    searchFilterComplaint(formData: any): Observable<any> {
        this.getUserIDToken();
        return this.http.post(this.expressApiUrl + '/NGP/SearchNGPComplaints/'+this.user_id, formData,this.httpOptions = {
            headers: new HttpHeaders({
                  'token': `${this.token}`
            })
        }).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getProductCategory(): Observable<any> {
        this.getUserIDToken();
        return this.http.get(this.expressApiUrl + '/BMADashboard/DashboardGallery/'+this.user_id
        , this.httpOptions = {
            headers: new HttpHeaders({
                  'token': `${this.token}`
            })
        }).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getProductSpecies(): Observable<any> {
        this.getUserIDToken();
        return this.http.get(this.expressApiUrl + '/Product/GetProductSpecies/'+this.user_id
        , this.httpOptions = {
            headers: new HttpHeaders({
                  'token': `${this.token}`
            })
        }).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    addProduct(formData: any): Observable<any> {
        this.getUserIDToken();
        return this.http.put(this.expressApiUrl + '/Product/CreateProduct', formData, this.httpOptions).pipe(
            respdata => respdata,
            catchError(this.handleError)
        );
    }
    getProductList(): Observable<any> {
        this.getUserIDToken();
     
             return this.http.get(this.expressApiUrl + '/Product/GetAllProducts/'+this.user_id, this.httpOptions = {
                // body: '[{"key": "user_id", "operation": "", "value": "26"}]',
                 headers: new HttpHeaders({
                       'token': `${this.token}`
                 }),
                
             }).pipe(
                 respdata => respdata,
                 catchError(this.handleError)
             );
         }
         getQRList(offset:any): Observable<any> {
            this.getUserIDToken();
         
                 return this.http.get(this.expressApiUrl + '/QR/GetAllQrDetails/'+this.user_id+'/'+offset ,this.httpOptions = {
                    // body: '[{"key": "user_id", "operation": "", "value": "26"}]',
                     headers: new HttpHeaders({
                           'token': `${this.token}`
                     }),
                    
                 }).pipe(
                     respdata => respdata,
                     catchError(this.handleError)
                 );
             }

         deleteProduct(prod_id:any): Observable<any> {
            this.getUserIDToken();
            return this.http.put(this.expressApiUrl + '/Product/DeactivateProd/'+this.user_id+'/'+prod_id, this.httpOptions = {
                headers: new HttpHeaders({
                      'token': `${this.token}`
                })
            }).pipe(
                respdata => respdata,
                catchError(this.handleError)
            );
        }

        searchFilterProduct(formData: any): Observable<any> {
            this.getUserIDToken();
            return this.http.post(this.expressApiUrl + '/Product/SearchProds/'+this.user_id, formData,this.httpOptions = {
                headers: new HttpHeaders({
                      'token': `${this.token}`
                })
            }).pipe(
                respdata => respdata,
                catchError(this.handleError)
            );
        }
        genuinityHeatmap(): Observable<any> {
            this.getUserIDToken();
            return this.http.get(this.expressApiUrl + '/BMADashboard/GenuinityHeatmap/'+this.user_id
            , this.httpOptions = {
                headers: new HttpHeaders({
                      'token': `${this.token}`
                })
            }).pipe(
                respdata => respdata,
                catchError(this.handleError)
            );
        }
}
