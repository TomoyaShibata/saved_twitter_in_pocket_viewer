defmodule PocketTwitterImageViewer.HelloController do
  use PocketTwitterImageViewer.Web, :controller

  # index  アクション
  # conn   リクエスト情報
  # params クライアントから渡されたパラメータ
  def index(conn, _params) do
    render conn, "index.html"
  end

  def getRequestToken(_conn, _params) do

  end
end