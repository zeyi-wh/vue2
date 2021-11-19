FROM nginx
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /data/sub_app/{{name}}/
#ENTRYPOINT nginx
CMD ["nginx", "-g", "daemon off;"]
