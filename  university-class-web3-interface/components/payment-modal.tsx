"use client"

import { useState } from "react"
import { Coins, CheckCircle2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface Course {
  id: number
  title: string
  description: string
  price: number
  level: string
  duration: string
  image: string
}

interface PaymentModalProps {
  course: Course
  isOpen: boolean
  onClose: () => void
}

export function PaymentModal({ course, isOpen, onClose }: PaymentModalProps) {
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [userBalance, setUserBalance] = useState(100) // 模拟用户余额

  const handlePayment = () => {
    setIsProcessing(true)

    // 模拟支付过程
    setTimeout(() => {
      if (userBalance >= course.price) {
        setUserBalance((prev) => prev - course.price)
        setIsSuccess(true)
        setIsProcessing(false)
      } else {
        setIsProcessing(false)
        toast({
          title: "余额不足",
          description: "您的代币余额不足，请先充值",
          variant: "destructive",
        })
      }
    }, 1500)
  }

  const handleContinue = () => {
    // 模拟跳转到课程学习页面
    toast({
      title: "课程已解锁",
      description: `您现在可以开始学习《${course.title}》了`,
    })
    onClose()
    setIsSuccess(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        {!isSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle>确认支付</DialogTitle>
              <DialogDescription>使用代币解锁课程内容，开始您的学习之旅</DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium">课程名称</span>
                <span>{course.title}</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium">课程价格</span>
                <div className="flex items-center gap-1">
                  <Coins className="h-4 w-4 text-primary" />
                  <span>{course.price} 代币</span>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium">您的余额</span>
                <div className="flex items-center gap-1">
                  <Coins className="h-4 w-4 text-primary" />
                  <span>{userBalance} 代币</span>
                </div>
              </div>
              <div className="flex items-center justify-between font-medium">
                <span>支付后余额</span>
                <div className="flex items-center gap-1">
                  <Coins className="h-4 w-4 text-primary" />
                  <span>{userBalance - course.price} 代币</span>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={onClose}>
                取消
              </Button>
              <Button onClick={handlePayment} disabled={isProcessing}>
                {isProcessing ? "处理中..." : "确认支付"}
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center py-6">
              <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
              <h2 className="text-xl font-bold mb-2">支付成功</h2>
              <p className="text-center text-gray-500 mb-6">您已成功解锁《{course.title}》课程</p>
              <Button onClick={handleContinue} className="w-full">
                开始学习
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

