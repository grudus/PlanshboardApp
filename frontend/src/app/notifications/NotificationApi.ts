import { HttpDispatch } from "app/shared/store/httpRequestActions";
import { apiRoutes } from "app/routing/routes";
import {
    acceptPlayNotificationSuccess,
    deleteNotificationSuccess,
    loadMoreNotificationsSuccess,
    markAllAsReadSuccess,
    markAsReadSuccess,
} from "app/notifications/__store/notificationActions";

interface MarkAsReadRequest {
    ids: number[];
}

export function markAsReadRequest(dispatch: HttpDispatch, request: MarkAsReadRequest): Promise<any> {
    return dispatch({
        type: "put",
        path: apiRoutes.notifications.markAsRead,
        successAction: () => markAsReadSuccess(request.ids),
        body: request,
    });
}

export function markAllAsReadRequest(dispatch: HttpDispatch): Promise<any> {
    return dispatch({
        type: "put",
        path: apiRoutes.notifications.markAllAsRead,
        successAction: markAllAsReadSuccess,
    });
}

interface AcceptPlayNotificationRequest {
    notificationId: number;
}

export function acceptPlayNotification(dispatch: HttpDispatch, request: AcceptPlayNotificationRequest): Promise<any> {
    return dispatch({
        type: "post",
        path: apiRoutes.playNotifications.accept,
        body: request,
        successAction: () => acceptPlayNotificationSuccess(request.notificationId),
    });
}

export function deleteRequest(dispatch: HttpDispatch, request: { id: number }): Promise<any> {
    return dispatch({
        type: "delete",
        path: apiRoutes.notifications.delete(request.id),
        successAction: () => deleteNotificationSuccess(request.id),
    });
}

export function loadMoreNotificationsRequest(
    dispatch: HttpDispatch,
    request: { count: number; dateToLookAfter: Date },
): Promise<any> {
    return dispatch({
        type: "get",
        path: apiRoutes.notifications.paginated(request.count, request.dateToLookAfter),
        successAction: loadMoreNotificationsSuccess,
    });
}