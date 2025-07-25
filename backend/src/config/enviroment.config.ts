export type EnviromentConfigType = {
  nodenv: string
  databaseUrl: string
  port: number
  jwtSecret: string
  jwtExpiresIn: string
}

export default () => ({
  nodenv: process.env.NODENV,
  databaseUrl: process.env.DATABASE_URL,
  port: parseInt(process.env.PORT || '3000'),
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
})
