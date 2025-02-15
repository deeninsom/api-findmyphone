-- AlterTable
ALTER TABLE "Devices" ADD COLUMN     "isMainDevice" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "DeviceLocation" (
    "id" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "deviceId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DeviceLocation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DeviceLocation" ADD CONSTRAINT "DeviceLocation_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Devices"("id") ON DELETE CASCADE ON UPDATE CASCADE;
