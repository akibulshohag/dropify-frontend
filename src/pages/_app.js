
import Layout from "@/components/Layout/layout";

import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import { StatusProvider } from "../context/contextStatus";

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
              pauseOnHover
              draggable={true}
            />
          </Layout>
        </main>
      </StatusProvider>
 
  );
}
