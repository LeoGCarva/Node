// Streams ->

// process.stdin.pipe(process.stdout); // basicamente isso é: Tudo que estou recebendo de entrada, ele vai encaminhar (com o pipe), para uma saída.
// process.stdin -> Stream de Leitura | process.stdout -> Stream de Saída;


import { Readable, Transform, Writable } from 'node:stream';

// Esse abaixo é um exemplo de Stream de Leitura:
class OneToHundredStream extends Readable {
    index = 1;

    _read() {
        const i = this.index++;

        setTimeout(() => {
            if (i > 100) {
                this.push(null);
            } else {
                const buf = Buffer.from(String(i));

                this.push(buf)
            }
        }, 1000)
    }
}

// Esse abaixo é um exemplo de Stream de Transformação:
class TransformNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const trasformed = Number(chunk.toString()) * -1;

        callback(null, Buffer.from(String(trasformed)));
    }
}

// Esse abaixo é um exemplo de Stream de Escrita:
class MultiplyByTenStream extends Writable {
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString() * 10))
        callback();
    }
}

new OneToHundredStream() // Apenas lê dados
    .pipe(new TransformNumberStream()) // Precisa receber dados de uma stream de leitura, e precisa mandar dados para uma stream de escrita
    .pipe(new MultiplyByTenStream()); // Apenas escreve dados