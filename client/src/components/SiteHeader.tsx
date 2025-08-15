import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Cloud, Edit, Info, MessageSquareText, MoreVertical } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <section className="flex w-full justify-between">
          <div className="flex  items-center justify-center gap-1 px-4 lg:gap-2 lg:px-6">
        <h1>Olga Tellis v. Bombay Municipal Corporation (1985).docx</h1>
        <Info className="size-4" />
        <Cloud className="size-4 text-green-500" />
        <p>Saved</p>
        </div>

        <div className="flex   items-center justify-center gap-1 px-8 lg:gap-2 lg:px-6"> 
          <MessageSquareText className="size-4" />
          <Edit className="size-4" />
          <MoreVertical className="size-4" />
        </div>
        </section>

      </div>
    </header>
  )
}
