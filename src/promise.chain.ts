export class PromiseChain {
 
    public static newChain(): Promise<void> {

        return new Promise((resolve, reject) => {

            setTimeout(() => {
                resolve();
            }, 100);
        });
    }
}