import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { BasicBoardGame, BoardGameListItem } from "app/board-games/__models/BoardGameModels";
import {
    addBoardGameSuccessAction,
    deleteBoardGameSuccessAction,
    editBoardGameSuccessAction,
    getBoardGamesSuccessAction,
    getSingleBoardGameSuccessAction,
} from "app/board-games/__store/boardGameActions";
import { DeleteBoardGameRequest } from "app/board-games/BoardGameApi";

export interface BoardGameStore {
    list: BoardGameListItem[];
    single?: BoardGameListItem;
}

const initialState: BoardGameStore = {
    list: [],
};

export const boardGamesReducer = createReducer<BoardGameStore>(initialState, {
    [getBoardGamesSuccessAction.type]: (state, action: PayloadAction<BoardGameListItem[]>) => ({
        ...state,
        list: action.payload,
    }),
    [addBoardGameSuccessAction.type]: (state, action: PayloadAction<BasicBoardGame>) => ({
        ...state,
        list: [...state.list, { ...action.payload, createdAt: new Date() }],
    }),
    [getSingleBoardGameSuccessAction.type]: (state, action: PayloadAction<BoardGameListItem>) => ({
        ...state,
        single: action.payload,
    }),
    [editBoardGameSuccessAction.type]: (state, action: PayloadAction<BasicBoardGame>) => ({
        ...state,
        list: state.list.map(game => (game.id === action.payload.id ? { ...game, name: action.payload.name } : game)),
    }),
    [deleteBoardGameSuccessAction.type]: (state, action: PayloadAction<DeleteBoardGameRequest>) => ({
        ...state,
        list: state.list.filter(game => game.id !== action.payload.id),
    }),
});