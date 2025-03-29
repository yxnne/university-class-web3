"use client"

import { useState } from "react"
import { CourseCard } from "./course-card"
import { PaymentModal } from "./payment-modal"

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
  },
  {
    id: 2,
    title: "React 前端框架",
    description: "深入学习 React 框架，构建现代化的用户界面和单页应用。",
    price: 30,
    level: "中级",
    duration: "15 小时",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 3,
    title: "Node.js 后端开发",
    description: "使用 Node.js 构建高效的后端服务和 API，实现全栈开发能力。",
    price: 35,
    level: "中级",
    duration: "12 小时",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 4,
    title: "数据库设计与优化",
    description: "学习关系型和非关系型数据库的设计原则和性能优化技巧。",
    price: 40,
    level: "高级",
    duration: "18 小时",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 5,
    title: "移动应用开发",
    description: "使用 React Native 开发跨平台移动应用，一次编写多处运行。",
    price: 45,
    level: "中级",
    duration: "20 小时",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: 6,
    title: "云服务与部署",
    description: "学习如何使用云服务部署和扩展您的应用，确保高可用性。",
    price: 50,
    level: "高级",
    duration: "15 小时",
    image: "/placeholder.svg?height=200&width=300",
  },
]

export default function CourseList() {
  const [selectedCourse, setSelectedCourse] = useState<(typeof coursesData)[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCourseClick = (course: (typeof coursesData)[0]) => {
    setSelectedCourse(course)
    setIsModalOpen(true)
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coursesData.map((course) => (
          <CourseCard key={course.id} course={course} onClick={() => handleCourseClick(course)} />
        ))}
      </div>

      {selectedCourse && (
        <PaymentModal course={selectedCourse} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  )
}

