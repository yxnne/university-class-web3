"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useToast } from "@/hooks/use-toast"
import TokenBalance from "./token-balance"

export function Header() {
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold mr-8">
            学习平台
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary">
              首页
            </Link>
            <Link href="/courses" className="text-sm font-medium hover:text-primary">
              全部课程
            </Link>
            <Link href="/my-courses" className="text-sm font-medium hover:text-primary">
              我的学习
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <TokenBalance />
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              toast({
                title: "通知",
                description: "您没有新的通知",
              })
            }}
          >
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-sm font-medium hover:text-primary" onClick={() => setIsOpen(false)}>
                  首页
                </Link>
                <Link
                  href="/courses"
                  className="text-sm font-medium hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  全部课程
                </Link>
                <Link
                  href="/my-courses"
                  className="text-sm font-medium hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  我的学习
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

