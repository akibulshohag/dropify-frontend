
import Layout from "@/components/Layout/layout";

import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import { StatusProvider } from "../context/contextStatus";
import 'react-toastify/dist/ReactToastify.css';

import 'react-loading-skeleton/dist/skeleton.css'

export default function App({ Component, pageProps }) {
  
  return (

      <StatusProvider>
        <main> 
          <Layout>
            <Component {...pageProps} />
            <ToastContainer
              position="top-right"
              autoClose="3000"
              hideProgressBar={false}
              closeOnClick={true}
              draggable={true}
            />
          </Layout>
        </main>
      </StatusProvider>
 
  );
}
