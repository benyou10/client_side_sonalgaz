import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  ForwardIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import {  signOut, useSession } from "next-auth/react";
 
export function SidebarWithBurgerMenu({sidebarOpen,setSidebarOpen}) {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
  const {data:session, loadingg} = useSession();
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
 
  return (
    <Card className={`${sidebarOpen=== false ? "hidden": " visible"} dark:bg-zinc-800 h-[calc(100vh-2rem)] fixed z-99999 max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5`}>
    
    
      <List>
      {session?.user?.image !== "employee_default" && (
  session?.user?.image === "admin" ? (
    <Link href="/dashboard/admin">
      <ListItem>
        <ListItemPrefix>
          <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
        </ListItemPrefix>
        devices
      </ListItem>
    </Link>
  ) : (
    <div>
      <Accordion
        open={open === 1}
        icon={
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
          />
        }
      >
        <ListItem className="p-0" selected={open === 1}>
          <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
            <ListItemPrefix>
              <PresentationChartBarIcon className="h-5 w-5" />
            </ListItemPrefix>
            <Typography color="blue-gray" className="mr-auto font-normal">
              Dashboard
            </Typography>
          </AccordionHeader>
        </ListItem>
        
        <AccordionBody className="py-1">
          <List className="p-0">
            
            <Link href='/dashboard/employees'>
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                employees
              </ListItem>
            </Link>
            <Link href="/dashboard/admin">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                devices
              </ListItem>
            </Link>
            <Link href="/dashboard/modattendence">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                change attendence records state
              </ListItem>
            </Link>
            <Link href="/dashboard/departments">
              <ListItem>
                <ListItemPrefix>
                  <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                </ListItemPrefix>
                departments
              </ListItem>
            </Link>
          </List>
        </AccordionBody>
      </Accordion>
    </div>
  )
)}

       
        <Accordion
          open={open === 2}
          icon={
            <ChevronDownIcon
              strokeWidth={2.5}
              className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`}
            />
          }
        >
         
        
        </Accordion>
        <hr className="my-2 border-blue-gray-50" />
        {(session?.user?.image != "employee_default" && session?.user?.image != "admin") && (  <Link href="/dashboard/profile">
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        </Link>)}
       
        <Link href="/dashboard/settings">
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        </Link>
        <Link href='/api/auth/signout'

        onClick={e => {e.preventDefault()
          
       signOut()}}>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
        </Link>
        <ListItem>
          <ListItemPrefix>
            <ForwardIcon className="h-5 w-5" />
          </ListItemPrefix>
          Contact
        </ListItem>
      </List>
  
    </Card>
  );
}