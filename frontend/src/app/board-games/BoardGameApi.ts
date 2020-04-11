import { HttpDispatch } from "app/shared/store/httpRequestActions";
import { apiRoutes } from "app/routing/routes";
import {
    addBoardGameSuccessAction,
    editBoardGameSuccessAction,
    getBoardGamesSuccessAction,
    getSingleBoardGameSuccessAction,
} from "app/board-games/store/boardGameActions";
import { IdResponse } from "app/shared/models/Response";

export function getBoardGamesRequest(dispatch: HttpDispatch): Promise<any> {
    return dispatch({
        type: "get",
        path: apiRoutes.boardGames.list,
        successAction: getBoardGamesSuccessAction,
    });
}

interface GetSingleBoardGameRequest {
    id: number;
}

export function getSingleBoardGame(dispatch: HttpDispatch, request: GetSingleBoardGameRequest): Promise<any> {
    return dispatch({
        type: "get",
        path: apiRoutes.boardGames.single(request.id),
        successAction: getSingleBoardGameSuccessAction,
    });
}

interface AddBoardGameRequest {
    name: string;
}

export function addBoardGameRequest(dispatch: HttpDispatch, request: AddBoardGameRequest): Promise<any> {
    return dispatch({
        type: "post",
        path: apiRoutes.boardGames.list,
        successAction: (response: IdResponse) => addBoardGameSuccessAction({ ...request, ...response }),
        body: request,
    });
}

interface EditBoardGameRequest extends AddBoardGameRequest {
    id: number;
}

export function editBoardGameRequest(dispatch: HttpDispatch, request: EditBoardGameRequest): Promise<any> {
    return dispatch({
        type: "put",
        path: apiRoutes.boardGames.single(request.id),
        successAction: () => editBoardGameSuccessAction(request),
        body: request,
    });
}
