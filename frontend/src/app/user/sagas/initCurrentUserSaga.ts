import { takeEvery, put } from "redux-saga/effects";
import { httpRequestAction } from "app/shared/store/httpRequestActions";
import { apiRoutes } from "app/routing/routes";
import { getCurrentUserSuccessAction } from "app/user/store/userActions";
import { authTokenObtainedAction } from "app/auth/store/authActions";

function* initCurrentUser() {
    yield put(
        httpRequestAction({
            type: "get",
            path: apiRoutes.user.current,
            successAction: getCurrentUserSuccessAction,
        }),
    );
}

export default function* initCurrentUserSaga(): Generator {
    yield takeEvery(["APP_INITIALIZED", authTokenObtainedAction.type], initCurrentUser);
}