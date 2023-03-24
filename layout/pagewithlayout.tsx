import { NextPage } from "next";
import Dashboard from './dashboard.layout';
import VendorLayout from "./vendor.layout";



type PageDashboard = NextPage & { layout: typeof Dashboard }
type PageVendor = NextPage & { layout: typeof VendorLayout }
type PageWithLayout = PageDashboard | PageVendor


export default PageWithLayout