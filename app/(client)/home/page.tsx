import Announcement from "@/app/components/Announcement"
import CategoryCard from "@/app/components/categories/CategoryCard"
import Hero from "@/app/components/Hero"
import Nav from "@/app/components/NavBar"

const HomePage = () => {
    return (
        <>
          <div className="flex gap-3 p-2">
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                <CategoryCard />
                
          </div>
            
            
        </>
    )
}

export default HomePage;