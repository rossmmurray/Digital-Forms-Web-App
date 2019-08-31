import { Home, AccountCircle, PeopleOutline, ListAlt, QuestionAnswer, Edit, AddComment, } from '@material-ui/icons';


const routes = [
  {
    path: "/",
    name: 'Home',
    icon: Home,
    role: ['admin', 'patient', 'clinician', null],
  },

  {
    path: '/Login',
    name: 'Login',
    icon: AccountCircle,
    role: ['admin', 'patient', 'clinician', null],
  },
  {
    path: "/admin/newQuestion",
    name: 'Add Question',
    icon: AddComment,
    role: ['admin', 'clinician'],
  },
  {
    path: '/editQuestions',
    name: 'Edit Questions',
    icon: Edit,
    role: ['admin', 'clinician'],
  },
  {
    path: "/answers",
    name: 'View Answers',
    icon: QuestionAnswer,
    role: ['admin',  'clinician'],
  },
  {
    path: "/admin/userManagement",
    name: 'Manage Users',
    icon: PeopleOutline,
    role: ['admin'],
  },
  {
    path: "/admin/manageForms",
    name: 'Manage Forms',
    icon: ListAlt,
    role: ['admin', 'clinician'],
  },
];

export default routes;