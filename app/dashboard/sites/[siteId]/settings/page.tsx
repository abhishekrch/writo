import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function SettingsSiteRoute(){
    return(
        <div className="flex items-center gap-x-2">
            <Button variant="outline" size="icon">
                <ChevronLeft className="size-4" />
            </Button>
        </div>
    )
}