import CourseList from "@/components/course-list"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">我的课程</h1>
        <p className="text-gray-500 mb-8">浏览所有可用课程，使用代币解锁学习内容</p>
        <CourseList />
      </main>
    </div>
  )
}

