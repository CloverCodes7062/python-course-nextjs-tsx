import { spawn } from "child_process";

export async function POST(req: any, res: any) {
    console.log('postPythonCode called');

    const body = await req.json();
    const { code, input } = body;
    console.log('code', code);
    console.log('input', input);

    let output = '';
    let err = '';

    const docker = spawn('docker', ['run', '--rm', '-i', '88da3eff335d']);
    docker.stdin.write(`${code}SPACEFORINPUT${input}`);
    docker.stdin.end();

    const promise = new Promise((resolve, reject) => {
        docker.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
            output = data.toString();
        });
        
        docker.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
            err = data.toString();
        });
    
        docker.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            if (err) {
                reject(err);
            } else {
                resolve(output);
            }
        });
    });

    try {
        const res = await promise;
        if (output.length >= 6 && output.slice(0,5) == "Error") {
            console.log('err found in res', output.slice(0, 5));
            return new Response(JSON.stringify({ err: res }));
        }
        return new Response(JSON.stringify({ result: res }));
    } catch (error) {
        console.error('An error occurred running the code:', error);
        return new Response(JSON.stringify({ err: err }));
    }
}