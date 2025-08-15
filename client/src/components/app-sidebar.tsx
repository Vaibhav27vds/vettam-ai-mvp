import * as React from "react"
import { 
  Plus, 
  Briefcase, 
  Search, 
  Languages, 
  Edit3, 
  Bookmark, 
  History, 
  MoreVertical,
  User
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// Sample chat history data
const chatHistory = [
  { id: 1, title: "Project Planning Discussion", time: "2 hours ago" },
  { id: 2, title: "Research on AI Tools", time: "1 day ago" },
  { id: 3, title: "Team Collaboration", time: "3 days ago" },
]

// Sample collaborators data
const collaborators = [
  { id: 1, name: "John Doe", avatar: "JD", isOnline: true },
  { id: 2, name: "Jane Smith", avatar: "JS", isOnline: false },
  { id: 3, name: "Mike Johnson", avatar: "MJ", isOnline: true },
]

const currentUser = { name: "You", avatar: "YU", isOnline: true }

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} className="bg-[#352442] border-none">
      <div className="flex flex-col bg-[#352442] h-full rounded-2xl m-4 p-4 space-y-6">
        {/* Header with Logo */}
        <SidebarHeader className="px-0">
          <div className="flex items-center space-x-3 mb-6">
            <div className="bg-white text-[#352442] flex items-center justify-center w-8 h-8 rounded-lg font-bold text-sm">
              V
            </div>
            <h1 className="text-white text-lg font-semibold">Vettam AI</h1>
          </div>
          
          {/* New Chat Button */}
          <button className="w-full bg-[#E07A53] text-white py-3 px-4 rounded-lg hover:bg-[#d6693f] transition-colors flex items-center justify-center space-x-2 font-medium">
            <Plus size={18} />
            <span>New Chat</span>
          </button>
        </SidebarHeader>

        <SidebarContent className="px-0 space-y-6">
          {/* Features Section */}
          <div className="space-y-3">
            <div className="bg-[#4F3861] text-white text-sm font-medium py-2 px-3 rounded-lg">
              Features
            </div>
            <div className="bg-[#694C80] rounded-lg p-4 space-y-3">
              <button className="w-full text-white hover:bg-[#5a3f6b] transition-colors py-2 px-3 rounded-md flex items-center space-x-3 text-left">
                <Briefcase size={18} />
                <span>Workspace</span>
              </button>
              <button className="w-full text-white hover:bg-[#5a3f6b] transition-colors py-2 px-3 rounded-md flex items-center space-x-3 text-left">
                <Search size={18} />
                <span>Research</span>
              </button>
              <button className="w-full text-white hover:bg-[#5a3f6b] transition-colors py-2 px-3 rounded-md flex items-center space-x-3 text-left">
                <Languages size={18} />
                <span>Translate</span>
              </button>
            </div>
          </div>

          {/* Tools Section */}
          <div className="space-y-3">
            <div className="bg-[#4F3861] text-white text-sm font-medium py-2 px-3 rounded-lg">
              Tools
            </div>
            <div className="bg-[#694C80] rounded-lg p-4 space-y-3">
              <button className="w-full bg-white text-[#694C80] hover:bg-gray-100 transition-colors py-2 px-3 rounded-md flex items-center space-x-3 text-left font-medium">
                <Edit3 size={18} />
                <span>Editor</span>
              </button>
              <button className="w-full text-white hover:bg-[#5a3f6b] transition-colors py-2 px-3 rounded-md flex items-center space-x-3 text-left">
                <Bookmark size={18} />
                <span>Bookmarks</span>
              </button>
            </div>
          </div>

          {/* Chat History Section */}
          <div className="space-y-3">
            <div className="bg-[#4F3861] text-white text-sm font-medium py-2 px-3 rounded-lg flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <History size={16} />
                <span>Chat History</span>
              </div>
              <MoreVertical size={16} className="text-white/70 hover:text-white cursor-pointer" />
            </div>
            <div className="bg-[#694C80] rounded-lg p-4 space-y-2">
              {chatHistory.map((chat) => (
                <button
                  key={chat.id}
                  className="w-full text-white hover:bg-[#5a3f6b] transition-colors py-2 px-3 rounded-md text-left"
                >
                  <div className="text-sm font-medium truncate">{chat.title}</div>
                  <div className="text-xs text-white/70">{chat.time}</div>
                </button>
              ))}
            </div>
          </div>
        </SidebarContent>

        {/* User Panel */}
        <div className="mt-auto space-y-4">
          {/* Collaborators */}
          <div className="space-y-3">
            <div className="text-white/70 text-xs font-medium">Collaborators</div>
            <div className="flex space-x-2">
              {collaborators.map((collaborator) => (
                <div key={collaborator.id} className="relative">
                  <div className="w-8 h-8 bg-[#694C80] text-white rounded-full flex items-center justify-center text-xs font-medium">
                    {collaborator.avatar}
                  </div>
                  {collaborator.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-[#352442]"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Current User */}
          <div className="border-t border-[#4F3861] pt-4">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-[#E07A53] text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {currentUser.avatar}
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-[#352442]"></div>
              </div>
              <div>
                <div className="text-white text-sm font-medium">{currentUser.name}</div>
                <div className="text-white/70 text-xs">Online</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SidebarRail />
    </Sidebar>
  )
}