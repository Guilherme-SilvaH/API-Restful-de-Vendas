import multer from "multer"
import path from "path"
import crypto from 'crypto'

const uploadFolder = path.resolve(__dirname,'..', '..', 'uploads')// pegamos o path que queremos armazenar os uploads

export default {
  directory: uploadFolder, //Diretorio para onde ira salvar os arquivos enviados, no caso usamos a variavel uploadFolder
  storage: multer.diskStorage({
    destination: uploadFolder,//destino onde ira salvar os arquivos
    filename(request, file, callback){// temos 3 parametros no filename
      const fileHash = crypto.randomBytes(10).toString('hex');// cripotografamos uma string para adcionar ao nome do arquivo para nao existir o mesmo nome de arquivos

      const filename = `${fileHash}-${file.originalname}`// adcionamos a criptografia ao no original que foi enviado

      callback(null, filename);// retornamos com o callback null caso nao tenha enviado nada e caso tenha sido enviado algum arquivo, enviamos o arquivo ja criptografado
    }
  })
}
