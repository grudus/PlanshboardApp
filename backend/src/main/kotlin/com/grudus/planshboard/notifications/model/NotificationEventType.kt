package com.grudus.planshboard.notifications.model

@Suppress("unused")
enum class NotificationEventType(val eventDataClass: Class<*>? = null) {
    PLAY_ADDED(PlayNotification::class.java),
    PLAY_EDITED(PlayNotification::class.java),
    PLAY_DELETED(PlayNotification::class.java),
    OPPONENT_LINKED
    ;
}