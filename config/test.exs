use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :pocket_twitter_image_viewer, PocketTwitterImageViewer.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :pocket_twitter_image_viewer, PocketTwitterImageViewer.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "pocket_twitter_image_viewer_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
