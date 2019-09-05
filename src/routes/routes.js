import { Home, AccountCircle, PeopleOutline, ListAlt, QuestionAnswer, Edit, AddComment } from '@material-ui/icons';


export const routes = [
  {
    path: "/",
    name: 'Home',
    icon: Home,
  },
  {
    path: '/Login',
    name: 'Login',
    icon: AccountCircle,
  },
  {
    path: "/admin/newQuestion",
    name: 'Add Question',
    icon: AddComment,
  },
  {
    path: '/editQuestions',
    name: 'Edit Questions',
    icon: Edit,
  },
  {
    path: "/answers",
    name: 'View Answers',
    icon: QuestionAnswer,
  },
  {
    path: "/admin/userManagement",
    name: 'Manage Users',
    icon: PeopleOutline,
  },
  {
    path: "/admin/manageForms",
    name: 'Manage Forms',
    icon: ListAlt,
  }
]