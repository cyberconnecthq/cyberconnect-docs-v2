---
id: notification
title: Notification
slug: /concepts/notification/
sidebar_label: Notification
sidebar_position: 5
description: The CyberConnect Protocol allows users to get notifications in time.
---

Notifications are chronological messages that users need to check to keep them updated. The CyberConnect Protocol allows users to get notifications when:

<ul>
    <li>Someone follows them.</li>
    <li>They receive a bidirectional connection request.</li>
    <li>Their accept a bidirectional connection request.</li>
    <li>Other scenarios to be added…</li>
</ul>

After receiving notifications, users can:

<ul>
    <li>Acknowledge a portion of notifications.</li>
    <li>Acknowledge all of notifications.</li>
</ul>

After Acknowledging, those notifications will change their status from `unRead` to `Read`.

Developers can incorporate notification modules to diversify the user experience by using the [CyberConnect JS SDK](/cyberconnect-sdk/connect-with-js-sdk/) and [CyberConnect API](/cyberconnect-api/graphql-api/identity/#retrieve-notifications).
