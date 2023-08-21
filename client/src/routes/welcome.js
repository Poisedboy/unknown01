import { StartPage } from "views/welcome";
import { AuthenticationScreen } from "views/authentication_screen";
import { QuestionList } from "views/question_list";
import { NoteEditor } from "views/NoteEditor/NoteEditor";
import { Dashboard } from "views/Dashboard/Dashboard";

const Routes = [
  {
    path: "/",
    view: StartPage,
    title: "Start Writting",
  },
  // {
  //   path: "/authentication",
  //   view: AuthenticationScreen,
  // },
  {
    path: "questionList",
    view: QuestionList,
  },
  {
    path: "/note-editor",
    view: NoteEditor,
  },
  // {
  //   path: "/note-editor/authentication",
  //   view: AuthenticationScreen,
  // },
  {
    path: "/dashboard",
    view: Dashboard,
  },
];

export default Routes;
