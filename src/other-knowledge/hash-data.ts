/* eslint-disable no-unused-vars */

// SỬ DỤNG WEB CRYPTO API

const generateAESKey = async (): Promise<CryptoKey> => {
  // Tạo AES key ngẫu nhiên (256-bit)
  return await crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 }, // Thuật toán AES-GCM, độ dài khóa 256 bit
    true, // Cho phép xuất khóa (có thể sử dụng lại)
    ["encrypt", "decrypt"] // Quyền sử dụng: mã hóa và giải mã
  );
};

const generateIV = (): Uint8Array => {
  return crypto.getRandomValues(new Uint8Array(12)); // Tạo IV code ngẫu nhiên, độ dài 12 byte (96-bit)
};

const encodeBase64 = (data: any): string => {
  return btoa(String.fromCharCode(...new Uint8Array(data)));
  // btoa: Chuyển một chuỗi nhị phân thành chuỗi Base64.
  // Uint8Array: Biểu diễn dữ liệu nhị phân dưới dạng mảng các byte.
  // String.fromCharCode(...array): Biến mảng byte thành chuỗi ký tự.
};

const decodeBase64 = (data: any): Uint8Array => {
  return Uint8Array.from(atob(data), (c) => c.charCodeAt(0));
  // atob: Chuyển một chuỗi Base64 về dạng nhị phân.
  // c.charCodeAt(0): Lấy mã ASCII của ký tự.
};

// Mã hóa dữ liệu
export const encryptAES = async (
  data: any,
  key: CryptoKey,
  iv: Uint8Array
): Promise<{ encryptedData: string; iv: string }> => {
  const encoder = new TextEncoder(); // Mã hóa chuỗi thành Uint8Array
  const encryptedData = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv, // iv ngẫu nhiên
    },
    key, // key AES
    encoder.encode(data) // dữ liệu được mã hóa
  );

  return {
    encryptedData: encodeBase64(encryptedData), // chuỗi má hóa Base64
    iv: encodeBase64(iv), // IV ở dạng Base64
  };
};

// Giải mã dữ liệu
export const decryptAES = async (
  encryptedData: string,
  key: CryptoKey,
  iv: string
): Promise<string> => {
  const decoder = new TextDecoder(); // Giải mã Uint8Array thành chuỗi
  const decryptedData = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: decodeBase64(iv), // IV ở dạng Uint8Array
    },
    key,
    decodeBase64(encryptedData) // Chuỗi mã hóa được chuyển thành Uint8Array
  );

  return decoder.decode(decryptedData);
};

// Tạo HMAC để đảm bảo tính toàn vẹn dữ liệu
export const generateHMACKey = async (): Promise<CryptoKey> => {
  return await crypto.subtle.generateKey(
    { name: "HMAC", hash: "SHA-256" }, // Thuật toán HMAC với SHA-256
    true,
    ["sign", "verify"] // Quyền sử dụng: ký và xác minh
  );
};

export const signHMAC = async (
  key: CryptoKey,
  data: string
): Promise<string> => {
  const encoder = new TextEncoder();
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(data) // Dữ liệu để tạo chữ ký
  );

  return encodeBase64(signature); // Trả về chữ ký Base64
};

export const verifyHMAC = async (
  key: CryptoKey,
  data: string,
  signature: string
): Promise<boolean> => {
  const encoder = new TextEncoder();
  return await crypto.subtle.verify(
    "HMAC",
    key,
    decodeBase64(signature), // Chữ ký để xác minh
    encoder.encode(data) // Dữ liệu gốc
  );
};

// Ví dụ sử dụng
(async () => {
  // Tạo khóa và IV
  const aesKey = await generateAESKey();
  const iv = generateIV();

  // Dữ liệu cần mã hóa
  const data = "Hello, I'm Cường Dev";

  // Mã hóa dữ liệu
  const { encryptedData, iv: ivBase64 } = await encryptAES(data, aesKey, iv);
  console.log("Dữ liệu mã hóa:", encryptedData);

  // Giải mã dữ liệu
  const decryptedData = await decryptAES(encryptedData, aesKey, ivBase64);
  console.log("Dữ liệu giải mã:", decryptedData);

  // Tạo HMAC key và tính toán chữ ký
  const hmacKey = await generateHMACKey();
  const signature = await signHMAC(hmacKey, encryptedData);
  console.log("Chữ ký HMAC:", signature);

  // Xác minh tính toàn vẹn
  const isValid = await verifyHMAC(hmacKey, encryptedData, signature);
  console.log("Chữ ký hợp lệ:", isValid);

  // Thay đổi dữ liệu đã mã hóa
  const tamperedData = encryptedData.slice(0, -1) + "A"; // Sửa 1 ký tự cuối cùng
  console.log("Dữ liệu mã hóa bị thay đổi:", tamperedData);

  // Xác minh tính toàn vẹn
  const isInValid = await verifyHMAC(hmacKey, tamperedData, signature);
  console.log("Chữ ký hợp lệ:", isInValid);
})();
