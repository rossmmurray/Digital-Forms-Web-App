import Home from '@material-ui/icons/Home';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AddComment from '@material-ui/icons/AddComment';
import Edit from '@material-ui/icons/Edit';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';
import PeopleOutline from '@material-ui/icons/PeopleOutline';
import ListAlt from '@material-ui/icons/ListAlt';


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