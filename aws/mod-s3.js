import { S3Client, ListObjectsCommand, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

class ModAwsS3 {

    /**
     * @param request {
     *  AccessKeyId: "AccessKeyId",
     *  SecretKey: "SecretKey",
     *  SessionToken: "SessionToken",
     *  BucketRegion: "BucketRegion",
     *  BucketName: "BucketName"
     * } 
     * @returns response {
     *  Success: true/false,
     *  ErrorMessage: "",
     *  IdToken: "IdToken",
     *  AccessToken: "AccessToken",
     *  RefreshToken: "RefreshToken"
     * }
     */
    async ListBucketObjects(request) {

        console.log("ModAwsS3.ListBucket");
    
        const s3Client = new S3Client({
            region: request.BucketRegion, 
            credentials: {
                accessKeyId: request.AccessKeyId,
                secretAccessKey: request.SecretKey,
                sessionToken: request.SessionToken
            }
        });
    
        const s3ListObjectsRequest = { Bucket: request.BucketName };
        try {

            console.log("ModAwsS3.ListBucket Listing Bucket Objects ...");
            const s3ListObjectsResponse = await s3Client.send(new ListObjectsCommand(s3ListObjectsRequest));
            console.log("ModAwsS3.ListBucket.Success", s3ListObjectsResponse);
            console.log("ModAwsS3.ListBucket.Bucket Objects: ");
            s3ListObjectsResponse.Contents.forEach(element => {
                console.log("  " + element.Key + " " + element.Size);
            });
            console.log("---- end ----");

            return {
                Success: true,
                BucketContents: s3ListObjectsResponse.Contents
            };
    
          } catch (err) {
            console.log("ModAwsS3.ListBucket.Error", err);
            return {
                Success: false,
                ErrorMessage: err
            };
          }
    
    };

};

export {ModAwsS3};