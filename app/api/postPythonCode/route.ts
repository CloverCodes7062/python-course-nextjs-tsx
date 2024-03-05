import { spawn } from "child_process";

export async function POST(req: any, res: any) {
    console.log('postPythonCode called');

    const body = await req.json();
    const { code } = body;

    let output = '';

    const docker = spawn('docker', ['run', '--rm', '-i', '00e07589691a']);
    docker.stdin.write(code);
    docker.stdin.end();

    const promise = new Promise((resolve, reject) => {
        docker.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
            output = data.toString();
        });
        
        docker.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
            reject(data);
        });
    
        docker.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            resolve(output);
        });
    });

    try {
        const result = await promise;
        return new Response(JSON.stringify({ result: result }));
    } catch (error) {
        console.error('An error occurred running the code:', error);
        return new Response(JSON.stringify({ result: 'not ran' }));
    }
}