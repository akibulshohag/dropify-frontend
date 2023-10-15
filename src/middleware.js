import { NextResponse } from "next/server";

export default function middleware(req){
    
    let token = req?.cookies.get('token')
     let url = req.url
     const urlR = req.nextUrl.clone()
     urlR.pathname = '/'


     if(!token &&  url.includes('/accounts')){
        return NextResponse.redirect(urlR)
     }

}