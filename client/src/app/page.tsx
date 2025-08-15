import { AppSidebar } from "@/components/app-sidebar";
import EditorComponent from "@/components/EditorComponent";
import { SiteHeader } from "@/components/SiteHeader";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <EditorComponent /> 
      </SidebarInset>
    </SidebarProvider>
  );
}
