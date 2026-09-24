package com.tanmayshinde.portfolio

import android.content.ActivityNotFoundException
import android.content.Intent
import android.net.Uri
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

/**
 * Opens https links, optionally preferring a specific Android package (e.g. LinkedIn).
 */
class ExternalLinkModule(private val reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String = "ExternalLink"

  @ReactMethod
  fun openUrl(url: String, preferredPackage: String?, promise: Promise) {
    try {
      val uri = Uri.parse(url)

      if (!preferredPackage.isNullOrBlank()) {
        val appIntent =
          Intent(Intent.ACTION_VIEW, uri).apply {
            setPackage(preferredPackage)
            addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
          }
        if (appIntent.resolveActivity(reactContext.packageManager) != null) {
          reactContext.startActivity(appIntent)
          promise.resolve("app")
          return
        }
      }

      val browserIntent =
        Intent(Intent.ACTION_VIEW, uri).apply {
          addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        }
      reactContext.startActivity(browserIntent)
      promise.resolve("browser")
    } catch (error: ActivityNotFoundException) {
      promise.reject("NO_HANDLER", "No app can open this link: $url", error)
    } catch (error: Exception) {
      promise.reject("OPEN_FAILED", error.message, error)
    }
  }
}
