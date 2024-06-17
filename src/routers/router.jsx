import { createBrowserRouter } from "react-router-dom";
import FeedEdit from "../pages/FeedEdit";
import FeedRead from "../pages/FeedRead";
import FeedWrite from "../pages/FeedWrite";
import Join from "../pages/Join";
import Login from "../pages/Login";
import Mypage from "../pages/Mypage";
import Newsfeed from "../pages/Newsfeed";
import Description from "../pages/Description";
const router = createBrowserRouter([
	{
		path: "/",
		element: <Newsfeed />
	},
	{
		path: "/feed-read/:feedId",
		element: <FeedRead />
	},
	{
		path: "/feed-write",
		element: <FeedWrite />
	},
	{
		path: "/feed-edit/:feedId",
		element: <FeedEdit />
	},
	{
		path: "/join",
		element: <Join />
	},
	{
		path: "/Description",
		element: <Description />
	},
	{
		path: "/login",
		element: <Login />
	},
	{
		path: "/my-page/:userId",
		element: <Mypage />
	}
]);
export default router;
