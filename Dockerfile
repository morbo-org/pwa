# Copyright (C) 2024 Pavel Sobolev
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as published
# by the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.

FROM docker.io/node:23.1.0 AS builder

WORKDIR /build/src

RUN --mount=type=cache,target=/root/.npm \
    --mount=type=bind,target=.,rw \
    npm install && \
    npm run build -- --outDir /build/output

FROM docker.io/nginx:1.27.2-alpine-slim

LABEL org.opencontainers.image.source=https://github.com/morbo-org/Morbo

COPY --from=builder /build/output /usr/share/nginx/html
