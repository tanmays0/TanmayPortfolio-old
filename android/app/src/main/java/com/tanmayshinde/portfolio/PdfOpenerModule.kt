package com.tanmayshinde.portfolio

import android.content.Intent
import android.net.Uri
import androidx.core.content.FileProvider
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.io.File
import java.io.FileOutputStream

/**
 * Copies a PDF from android assets into cache and opens it with an external PDF viewer/browser.
 */
class PdfOpenerModule(private val reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String = "PdfOpener"

  @ReactMethod
  fun openAssetPdf(assetFileName: String, promise: Promise) {
    try {
      val outFile = File(reactContext.cacheDir, assetFileName)
      reactContext.assets.open(assetFileName).use { input ->
        FileOutputStream(outFile).use { output ->
          input.copyTo(output)
        }
      }

      val uri: Uri =
        FileProvider.getUriForFile(
          reactContext,
          reactContext.packageName + ".fileprovider",
          outFile,
        )

      val viewIntent =
        Intent(Intent.ACTION_VIEW).apply {
          setDataAndType(uri, "application/pdf")
          addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
          addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        }

      // Prefer an app chooser so Chrome / Drive / PDF viewers can open the file.
      val chooser =
        Intent.createChooser(viewIntent, "Open resume").apply {
          addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        }

      reactContext.startActivity(chooser)
      promise.resolve(true)
    } catch (error: Exception) {
      promise.reject("PDF_OPEN_ERROR", error.message, error)
    }
  }
}
