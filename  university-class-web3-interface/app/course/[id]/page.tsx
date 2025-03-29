"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Clock, BarChart, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

// 模拟课程数据
const coursesData = [
  {
    id: 1,
    title: "Web 开发基础",
    description: "学习 HTML, CSS 和 JavaScript 的基础知识，开始您的 Web 开发之旅。",
    price: 20,
    level: "初级",
    duration: "10 小时",
    image: "/placeholder.svg?height=200&width=300",
    chapters: [
      { id: 1, title: "HTML 基础", duration: "45 分钟", completed: false },
      { id: 2, title: "CSS 样式", duration: "60 分钟", completed: false },
      { id: 3, title: "JavaScript 入门", duration: "90 分钟", completed: false },
      { id: 4, title: "响应式设计", duration: "60 分钟", completed: false },
    ],
  },
  {
    id: 2,
    title: "React 前端框架",
    description: "深入学习 React 框架，构建现代化的用户界面和单页应用。",
    price: 30,
    level: "中级",
    duration: "15 小时",
    image: "/placeholder.svg?height=200&width=300",
    chapters: [
      { id: 1, title: "React 基础", duration: "60 分钟", completed: false },
      { id: 2, title: "组件与 Props", duration: "75 分钟", completed: false },
      { id: 3, title: "状态管理", duration: "90 分钟", completed: false },
      { id: 4, title: "Hooks 详解", duration: "120 分钟", completed: false },
    ],
  },
  // 其他课程数据...
]

export default function CoursePage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [course, setCourse] = useState<(typeof coursesData)[0] | null>(null)
  const [isPurchased, setIsPurchased] = useState(false)

  useEffect(() => {
    // 模拟从 API 获取课程数据
    const courseId = Number(params.id)
    const foundCourse = coursesData.find((c) => c.id === courseId)

    if (foundCourse) {
      setCourse(foundCourse)

      // 模拟检查用户是否已购买课程
      // 实际应用中应该从后端 API 获取此信息
      const purchasedCourses = localStorage.getItem("purchasedCourses")
      if (purchasedCourses) {
        const ids = JSON.parse(purchasedCourses)
        setIsPurchased(ids.includes(courseId))
      }
    } else {
      toast({
        title: "课程不存在",
        description: "找不到请求的课程",
        variant: "destructive",
      })
      router.push("/")
    }
  }, [params.id, router, toast])

  const handleChapterClick = (chapterId: number) => {
    if (!isPurchased) {
      toast({
        title: "未购买课程",
        description: "请先购买课程以访问章节内容",
        variant: "destructive",
      })
      return
    }

    // 模拟跳转到章节学习页面
    toast({
      title: "正在加载章节",
      description: "章节内容正在准备中...",
    })
  }

  if (!course) {
    return <div className="flex justify-center items-center min-h-screen">加载中...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" className="mb-6 flex items-center gap-2" onClick={() => router.push("/")}>
          <ArrowLeft className="h-4 w-4" />
          返回课程列表
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="aspect-video w-full overflow-hidden rounded-lg mb-6">
              <img src={course.image || "/placeholder.svg"} alt={course.title} className="h-full w-full object-cover" />
            </div>

            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <BarChart className="h-4 w-4" />
                <span>{course.level}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>{course.duration}</span>
              </div>
            </div>

            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">课程概述</TabsTrigger>
                <TabsTrigger value="chapters">课程章节</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-4">
                <div className="prose max-w-none">
                  <p>{course.description}</p>
                  <h3>学习目标</h3>
                  <ul>
                    <li>掌握{course.title}的核心概念和基础知识</li>
                    <li>能够独立完成相关项目和实践练习</li>
                    <li>理解行业最佳实践和常见问题解决方案</li>
                    <li>获得实际工作中应用这些技能的能力</li>
                  </ul>
                  <h3>适合人群</h3>
                  <p>
                    本课程适合
                    {course.level === "初级"
                      ? "初学者和编程新手"
                      : course.level === "中级"
                        ? "有一定编程基础的开发者"
                        : "有丰富开发经验，希望提升专业技能的开发者"}
                    。{course.level !== "初级" && "建议在学习本课程前，先掌握相关的基础知识。"}
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="chapters" className="mt-4">
                <div className="space-y-4">
                  {course.chapters.map((chapter) => (
                    <div
                      key={chapter.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        isPurchased ? "hover:bg-gray-100" : "opacity-80"
                      }`}
                      onClick={() => handleChapterClick(chapter.id)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          {chapter.completed ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <div
                              className={`h-5 w-5 rounded-full border-2 ${
                                isPurchased ? "border-gray-300" : "border-gray-200"
                              }`}
                            />
                          )}
                          <h3 className="font-medium">{chapter.title}</h3>
                        </div>
                        <div className="text-sm text-gray-500">{chapter.duration}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg border shadow-sm sticky top-6">
              <div className="text-3xl font-bold mb-4">{course.price} 代币</div>
              <p className="text-gray-500 mb-6">解锁完整课程内容，开始您的学习之旅</p>

              {isPurchased ? (
                <Button className="w-full mb-4" onClick={() => handleChapterClick(1)}>
                  继续学习
                </Button>
              ) : (
                <Button
                  className="w-full mb-4"
                  onClick={() => {
                    // 模拟购买课程
                    const purchasedCourses = localStorage.getItem("purchasedCourses")
                    const ids = purchasedCourses ? JSON.parse(purchasedCourses) : []

                    if (!ids.includes(course.id)) {
                      ids.push(course.id)
                      localStorage.setItem("purchasedCourses", JSON.stringify(ids))
                      setIsPurchased(true)

                      toast({
                        title: "购买成功",
                        description: `您已成功购买《${course.title}》课程`,
                      })
                    }
                  }}
                >
                  购买课程
                </Button>
              )}

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>完整课程内容</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>实践项目和练习</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>终身访问权限</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>课程证书</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

