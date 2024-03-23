import Header from "@/components/Header"

 
export default function Layout({ children }:any) {
  return (
    <>
     <Header/>
     <div className="dark:bg-black-2 dark:text-bodydark">
      <main>{children}</main></div>
      
    </>
  )
}