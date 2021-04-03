import TaskBoard from "@/views/TaskBoard.vue"
import TaskEdit from "@/components/task/TaskEdit"

export default [
  {
    path: "/",
    name:"boards",
    redirect: "/boards"
  },
  {
    path: "/boards",
    components: {
        default: TaskBoard
    },
    children: [
        {
            path: 'edit',
            name: 'edit',
            component: TaskEdit
            
        }
    ]
  },
 
]