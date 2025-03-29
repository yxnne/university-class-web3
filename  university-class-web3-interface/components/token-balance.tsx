"use client"

import { useState } from "react"
import { Coins } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function TokenBalance() {
  const { toast } = useToast()
  const [balance, setBalance] = useState(100)
  const [amount, setAmount] = useState("")

  const handleTopUp = () => {
    if (!amount || isNaN(Number(amount))) {
      toast({
        title: "错误",
        description: "请输入有效的充值金额",
        variant: "destructive",
      })
      return
    }

    setBalance((prev) => prev + Number(amount))
    setAmount("")
    toast({
      title: "充值成功",
      description: `已成功充值 ${amount} 代币`,
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Coins className="h-4 w-4" />
          <span>{balance} 代币</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>充值代币</DialogTitle>
          <DialogDescription>为您的账户充值代币，解锁更多课程内容</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              金额
            </Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="col-span-3"
              min="1"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">当前余额</Label>
            <div className="col-span-3 flex items-center gap-2">
              <Coins className="h-4 w-4" />
              <span>{balance} 代币</span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleTopUp}>确认充值</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

