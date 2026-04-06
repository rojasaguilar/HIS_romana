import app from './presentation/http/server';
import { env } from './infraestructure/config/environment';
import { connectDB } from './infraestructure/dataproviders/mongodb-dataprovider/config/mongoose-connect';
//patients

await connectDB();

app.listen(env.PORT, () => {
  console.log(`Listening on port ${env.PORT}`);
});
